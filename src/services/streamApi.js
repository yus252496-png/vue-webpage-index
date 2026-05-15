// 流式API服务
import { API_CONFIG } from '../config/api.js'

export async function streamApiRequest(prompt, onChunk, onComplete, onError) {
  try {
    const response = await fetch(API_CONFIG.DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: API_CONFIG.DEEPSEEK_MODEL,
        messages: [
          {
            role: 'system',
            content: '你是一个专业的前端开发工程师，擅长使用各种前端技术栈。请根据用户的需求生成完整的前端代码，包括HTML、CSS和JavaScript。确保代码可以直接运行，并且具有良好的可读性和可维护性。请生成完整的代码，不要省略任何部分。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: API_CONFIG.TEMPERATURE,
        max_tokens: API_CONFIG.MAX_TOKENS,
        stream: true
      })
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || `API请求失败: ${response.status}`)
    }
    
    await handleStreamResponse(response, onChunk, onComplete, onError)
  } catch (error) {
    if (onError) {
      onError(error)
    } else {
      console.error('API请求失败:', error)
      throw error
    }
  }
}

async function handleStreamResponse(response, onChunk, onComplete, onError) {
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  
  const processStream = async () => {
    try {
      const { done, value } = await reader.read()
      
      if (done) {
        if (onComplete) {
          onComplete()
        }
        return
      }
      
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() // 保留最后不完整的行
      
      for (const line of lines) {
        if (line.trim() === '') continue
        if (line.startsWith('data: ')) {
          const data = line.substring(6)
          if (data === '[DONE]') {
            if (onComplete) {
              onComplete()
            }
            return
          }
          
          try {
            const json = JSON.parse(data)
            if (json.choices && json.choices[0] && json.choices[0].delta && json.choices[0].delta.content) {
              const content = json.choices[0].delta.content
              if (onChunk) {
                onChunk(content)
              }
            }
          } catch (error) {
            console.error('解析流式数据失败:', error)
          }
        }
      }
      
      processStream()
    } catch (error) {
      if (onError) {
        onError(error)
      } else {
        console.error('流式处理错误:', error)
      }
    }
  }
  
  processStream()
}
