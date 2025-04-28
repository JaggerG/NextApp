'use server'
import { sendEmail } from '@/lib/email'
type FormData = {
    email: string,
    password: string,
    confirmPassword:string
}
const EmailBtn = () => {
    // const {email, password, confirmPassword} = props;
    // if (password !== confirmPassword) {
    //     //TODO: 提示密码不一致
    //     return;
    // }
    // sendEmail({
    //         to: '1028286644@qq.com',
    //         subject: 'serverComponent',
    //         text: 'serverComponent'
    //     })
    const handleSendEmail = () => {
        const res = sendEmail({
            to: '1028286644@qq.com',
            subject: 'serverComponent',
            text: 'serverComponent'
        })
        console.log(res);
    }
    return (
        <div className='h-12 flex items-center justify-center bg-black text-white mt-6 rounded-md cursor-pointer'>确认注册</div>
    )
    
}
export default EmailBtn;