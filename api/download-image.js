// API endpoint: /api/download-image
// Downloads an image from a URL and returns it as base64
// This bypasses CORS because it runs on the server, not browser

export default async function handler(req, res) {
  // Enable CORS for the frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    
    // Fetch the image from server-side (no CORS issues!)
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9,he;q=0.8',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
        'Referer': 'https://monday.com/',
      },
      redirect: 'follow'
    });
    
    if (!response.ok) {
      // Get response body for debugging
      let bodyText = '';
      try {
        bodyText = await response.text();
        bodyText = bodyText.substring(0, 200);
      } catch (e) {
        bodyText = 'Could not read body';
      }
      
      return res.status(response.status).json({ 
        error: `Failed to download: HTTP ${response.status}`,
        statusText: response.statusText,
        url: url,
        responseBody: bodyText,
        responseHeaders: Object.fromEntries(response.headers.entries())
      });
    }
    
    // Get the image as buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Detect image type from magic bytes
    let mimeType = 'image/png';
    let extension = 'png';
    
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
      mimeType = 'image/png';
      extension = 'png';
    } else if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
      mimeType = 'image/jpeg';
      extension = 'jpg';
    } else if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
      mimeType = 'image/gif';
      extension = 'gif';
    } else {
      // Try to use content-type header
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('jpeg') || contentType.includes('jpg')) {
        mimeType = 'image/jpeg';
        extension = 'jpg';
      } else if (contentType.includes('gif')) {
        mimeType = 'image/gif';
        extension = 'gif';
      }
    }
    
    // Verify it's actually an image (size check)
    if (buffer.length < 100) {
      return res.status(400).json({ 
        error: 'Downloaded content is too small to be a valid image',
        size: buffer.length
      });
    }
    
    // Return base64 encoded image
    const base64 = buffer.toString('base64');
    
    return res.status(200).json({
      success: true,
      base64: base64,
      mimeType: mimeType,
      extension: extension,
      size: buffer.length
    });
    
  } catch (error) {
    console.error('Download error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
