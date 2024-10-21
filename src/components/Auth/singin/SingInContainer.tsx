import { FunctionComponent } from "react";
import SingInForm from "./SingInForm";

const SingInContainer: FunctionComponent = () => {
    return(
        <>
            <h2 className="text-center first-letter:uppercase text-2xl font-semibold mb-14">welcome back</h2>
            <SingInForm />
            <p className="text-center first-letter:uppercase space-x-1"><span>no account?</span>
                <button type="button" className="first-letter:uppercase font-semibold p-0">create account</button>
            </p>
        </>
    )
}

export default SingInContainer