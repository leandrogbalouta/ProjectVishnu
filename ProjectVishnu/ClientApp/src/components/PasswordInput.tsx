import React, { useState } from "react"
import {
    InputGroup,
    Input,
    InputLeftElement,
    InputRightElement,
    Button
} from '@chakra-ui/react'
import { RiEyeLine, RiEyeOffLine, RiKeyFill } from "react-icons/ri";
import { FieldValues, UseFormRegister } from "react-hook-form";


type InputProps<T extends FieldValues> = {
    label: any;
    register: UseFormRegister<T>;
    required: boolean;
    id: string,
    placeHolder?: string | undefined;
};

export default function PasswordInput<Type extends FieldValues>({ label, register, required, id, placeHolder }: InputProps<Type>) {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <InputGroup>
            <InputLeftElement
                pointerEvents='none'
                children={<RiKeyFill color="#000E31" />}
                className="auth-panel-icon"
            />
            <Input
                id={id}
                type={show ? "text" : "password"}
                placeholder={placeHolder ? placeHolder : "Password"}
                autoComplete="new-password"
                {...register(label, {required})}
            />
            <InputRightElement width='4.5rem' >
                <Button
                    h='1.75rem'
                    size='lg'
                    background='none'
                    tabIndex={-1}
                    onClick={handleClick}
                >
                    {show
                        ? <RiEyeLine />
                        : <RiEyeOffLine />
                    }
                </Button>
            </InputRightElement>
        </InputGroup>
    )
} 