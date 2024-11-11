import { NextRequest,NextResponse } from 'next/server'
import { createClient,OAuthStrategy } from '@wix/sdk'



const midware = async (request:NextRequest) => {
  const cookies =request.cookies
  const res = NextResponse.next()

  if (cookies.get('refreshToken')) {
    return res
  }


const wixClient = createClient({
    auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
        }),
 })

const tokens = await wixClient.auth.generateVisitorTokens();
res.cookies.set('refreshToken',JSON.stringify(tokens.refreshToken),{
    maxAge: 60 * 60 * 24 * 30,
})

return res

}


export default midware