
import style from './signup.module.css';
import {ChangeEventHandler, FormEventHandler} from "react";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import {redirect} from "next/navigation";

export default function SignupModal() {

    /*const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        fetch('http://localhost:9090/api/users', {
            method: 'post',
            body: JSON.stringify({
                id,
                nickname,
                image,
                password,
            }),
            credentials: 'include',
        }).then((response: Response) => {
            console.log(response.status);
            if (response.status === 200) {
                router.replace('/home');
            }
        }).catch((err) => {
            console.error(err);
        });
    }*/
    const submit = async (formData: FormData)=> {
        'use server'
        if(!formData.get('id')){
            return {message:'no_id'};
        }
        if(!formData.get('name')){
            return {message:'no_name'};
        }
        if(!formData.get('password')){
            return {message:'no_password'};
        }
        if(!formData.get('image')){
            return {message:'no_image'};
        }

        let shouldRedirect = false;
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,{
                method:'post',
                body:formData,
                credentials: 'include'
            })

            if(response.status === 403){
                return {message:'user_exists'};
            }


            shouldRedirect = true;
            console.log(response.status);
            console.log(await response.json());
        }catch (err){
            console.error(err);
        }

        if(shouldRedirect){ //redirect는 try-catch문에 있으면 안됨!
            redirect('/home');
        }
    }

    return (
        <>
            <div className={style.modalBackground}>
                <div className={style.modal}>
                    <div className={style.modalHeader}>
                        <BackButton/>
                        <div>계정을 생성하세요.</div>
                    </div>
                    <form action={submit}>
                        <div className={style.modalBody}>
                            <div className={style.inputDiv}>
                                <label className={style.inputLabel} htmlFor="id">아이디</label>
                                <input id="id" name="id" className={style.input} type="text" placeholder="" required
                                />
                            </div>
                            <div className={style.inputDiv}>
                                <label className={style.inputLabel} htmlFor="name">닉네임</label>
                                <input id="name" name="name" className={style.input} type="text" placeholder="" required
                                />
                            </div>
                            <div className={style.inputDiv}>
                                <label className={style.inputLabel} htmlFor="password">비밀번호</label>
                                <input id="password" name="password" className={style.input} type="password" placeholder="" required
                                />
                            </div>
                            <div className={style.inputDiv}>
                                <label className={style.inputLabel} htmlFor="image">프로필</label>
                                <input id="image" name="image" className={style.input} type="file" accept="image/*" required
                                />
                            </div>
                        </div>
                        <div className={style.modalFooter}>
                            <button type='submit' className={style.actionButton}>가입하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </>)
}