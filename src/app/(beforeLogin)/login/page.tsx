"use client";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import Home from "@/app/(beforeLogin)/page";

export default function Login(){
    //redirect('/i/flow/login'); //->이건 서버 리다이렉션임.
    const router = useRouter();
    useEffect(()=>{
        router.replace('/i/flow/login')
    },[]);

    return <Home/>;
}