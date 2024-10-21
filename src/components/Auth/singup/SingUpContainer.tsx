import { FunctionComponent } from "react";
import SingUpForm from "./SingUpForm";

const SingUpContainer: FunctionComponent = () => {
    return(
        <>
            <h2 className="text-center first-letter:uppercase text-2xl font-semibold mb-14">join us</h2>
            <SingUpForm />
            <p className="text-center first-letter:uppercase space-x-1"><span>alredy have account?</span>
                <button type="button" className="first-letter:uppercase font-semibold p-0">sing in</button>
            </p>
        </>
    )
}

export default SingUpContainer