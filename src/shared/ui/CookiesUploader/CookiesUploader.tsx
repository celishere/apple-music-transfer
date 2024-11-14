import { DragEvent, useCallback, useEffect, useState, useRef, ChangeEvent } from "react";
import axios from "axios";

import useGlobalStore from "@/entities/Global/store/useGlobalStore";

import { useToast } from "@/shared/lib/hooks/useToast";

import { UploadIcon } from "@/shared/icons/UploadIcon";
import { LoaderIcon } from "@/shared/icons/LoaderIcon";

import cls from "./CookiesUploader.module.scss";

interface CookiesUploaderProps {
    isUploading?: boolean;
}

export const CookiesUploader = ({ isUploading = false }: CookiesUploaderProps) => {
    const state = useGlobalStore();
    const toasts = useToast();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        state.setStep(isUploading ? 4 : 1);
    }, []);

    const processFile = async (file: File) => {
        if (file && file.type === "application/json") {
            const formData = new FormData();
            formData.append("cookiesRaw", file);

            setLoading(true);

            try {
                const response = await axios.post('/api/getSession', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                if (isUploading) {
                    state.setTransferAuth(response.data);
                    state.setStep(5);
                } else {
                    state.setAuth(response.data);
                    state.setStep(2);
                }
            } catch (error) {
                console.error(error);
                toasts.error({ message: "Error processing file. Please try again." });
            } finally {
                setLoading(false);
            }
        } else {
            toasts.error({ message: "Please select a valid JSON file." });
        }
    };

    const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];
        processFile(file);
    }, []);

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            processFile(file);
        }
    };

    return (
        <div className={cls.CookiesUploaderBox}>
            <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
            />

            <div
                className={cls.CookiesUploader}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onClick={handleClick}
            >
                {isLoading ? <LoaderIcon /> : (
                    <>
                        <UploadIcon active={isDragging}/>
                        <a>{isDragging ? "Drop here!" : "Click or Drag & Drop JSON Cookie file here"}</a>
                        {!isUploading ? (
                            <p>Account from which we are exporting the media library.</p>
                        ) : (
                            <p>Account to which we are transferring the media library.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}