"use server"
import { wixClientServer } from "./wixClientServer"

const updateUser = async (formData:FormData) => {
    const wixClient = await wixClientServer()

    const id = formData.get('id') as string
    const username = formData.get('username') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string

    try {
        const actionRes = await wixClient.members.updateMember(id, {
        contact: {
            firstName:firstName || undefined, 
            lastName:lastName || undefined, 
            phones: [phone]
        }, 
        profile: {nickname: username || undefined}, 
        loginEmail:email || undefined
    });
    console.log("updatedUserInfo", actionRes)
    } catch (error) {
        console.log("actionError", error)
        
    }
   

}



export default updateUser