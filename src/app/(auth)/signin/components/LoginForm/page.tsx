'use client';
import { useState, useEffect } from 'react'
import { sendEmail } from '@/lib/email'
import EmailBtn from './EmailBtn'
import axios from 'axios'
type Form = {
    email: string,
    password: string,
    confirmPassword: string,
}
const LoginForm = () => {
    const [formData,setFormData] = useState<Form>({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = async () => {
        const res = await axios.post('/api/auth/email', {
            method: 'POST',
            data:{
                to: '1028286644@qq.com',
                subject: 'serverComponent',
                text: 'serverComponent'
            }
        })
        console.log(res.data);
    }
    useEffect(() => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log(emailPattern.test(formData.email));
    },[formData.email])
    return (
        <>
            <div className="p-2">
            <form className='pb-4'>
                <div className='divide-y'>
                <div className='pb-2'>
                    <div className='text-base mb-2'>邮箱</div>
                        <input
                            className='border-0 outline-0'
                            name='email'
                            type='text'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='请输入邮箱' />
                    </div>
                    <div className='pt-4 pb-2'>
                        <div className='text-base mb-2'>密码</div>
                        <input
                            className='border-0 outline-0'
                            name='password'
                            type='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='请输入密码' />
                    </div>
                    <div className='pt-4 pb-2'>
                        <div className='text-base mb-2'>确认密码</div>
                        <input
                            className='border-0 outline-0'
                            name='confirmPassword'
                            type='password'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder='请再次确认密码' />
                    </div>
                    {/* <EmailBtn /> */}
                    <div className='h-12 flex items-center justify-center bg-black text-white mt-6 rounded-md cursor-pointer' onClick={handleSubmit}>确认注册</div>
                </div>
            </form>
        </div>
        </>

    )
}
export default LoginForm;