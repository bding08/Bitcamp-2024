import { FC, ReactNode } from "react"
import { Button } from "./ui/button"

interface GoogleSignInProp {
    children: ReactNode;
}

const GoogleSignInBtn: FC<GoogleSignInProp> = ( { children } ) => {
    
    const loginWithGoogle = () => {
        console.log("logged in with google")
    }

    return (
        <Button onClick={loginWithGoogle} className='w-full'> {children} </Button>
    )
}

export default GoogleSignInBtn