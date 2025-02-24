import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VendorLogin = () => {
    // Access global state
    const { backendUrl, setVendorToken } = useContext(AppContext);

    const [state, setState] = useState("Sign Up");
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const onSubmitHandler = async (event) => {
        event.preventDefault(); // Prevent form reload

        try {
            let response;
            if (state === "Sign Up") {
                response = await axios.post(`${backendUrl}/api/vendor/signup`, {
                    name,
                    email,
                    password,
                });
            } else {
                response = await axios.post(`${backendUrl}/api/vendor/signin`, {
                    email,
                    password,
                });
            }

            if (response.data.success) {
                console.log(response.data);

                localStorage.setItem("vendorToken", response.data.vendorToken);
                localStorage.setItem("vendorId", response.data.vendorId);
                setVendorToken(response.data.vendorToken);

                toast.success(response.data.message);
                navigate("/");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] border rounded-xl text-zinc-600 text-sm shadow-lg">
                <p className="text-2xl font-semibold">
                    {state === "Sign Up" ? "Register as Vendor" : "Vendor Login"}
                </p>
                <p>
                    Please {state === "Sign Up" ? "sign up" : "login"} to manage your store.
                </p>

                {state === "Sign Up" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                )}

                <div className="w-full">
                    <p>Email</p>
                    <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>

                <div className="w-full">
                    <p>Password</p>
                    <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-primary text-white w-full py-2 rounded-md text-base"
                >
                    {state === "Sign Up" ? "Register" : "Login"}
                </button>

                <p>
                    {state === "Sign Up"
                        ? "Already have a vendor account?"
                        : "Don't have a vendor account?"}{" "}
                    <span
                        onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
                        className="text-primary cursor-pointer underline"
                    >
                        {state === "Sign Up" ? "Login here" : "Register here"}
                    </span>
                </p>
            </div>
        </form>
    );
};

export default VendorLogin;
