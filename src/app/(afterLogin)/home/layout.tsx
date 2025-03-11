import {ReactNode} from "react";

export default async function HomeLayout({children}:{children:ReactNode}){
    return (
        <div>
            HOME LAYOUT
            {children}
        </div>
    )
}