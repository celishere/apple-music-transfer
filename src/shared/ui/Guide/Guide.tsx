import { useState } from "react";

import Image from "next/image";

import { InfoIcon } from "@/shared/icons/InfoIcon";
import { CollapseIcon } from "@/shared/icons/CollapseIcon";

import { Step } from "@/shared/ui/Step";

import cls from "./Guide.module.scss";

const CHROME_EXTENSION_LINK = "https://chromewebstore.google.com/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc";
const FIREFOX_EXTENSION_LINK = "https://addons.mozilla.org/en-US/firefox/addon/get-cookies-txt-locally/";

interface GuideProps {
    isUploading?: boolean;
}

export const Guide = ({ isUploading = false }: GuideProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const collapse = () => setCollapsed(prevState => !prevState);
    const link = (url: string, text: string) => (
        <a target="_blank" href={url}>{text}</a>
    );

    return (
        <div className={cls.GuideBox} data-open={collapsed ? "true" : "false"}>
            <div className={cls.Guide}>
                <div className={cls.GuideBtn}>
                    <div className={cls.GuideBtnTitle}>
                        <InfoIcon/>
                        <span>How to use</span>
                    </div>

                    <button
                        className={cls.GuideBtnCollapse}
                        onClick={collapse}
                        data-open={collapsed ? "true" : "false"}
                    >
                        <CollapseIcon/>
                    </button>
                </div>

                <div className={cls.GuideSpoilerItem} data-open={collapsed ? "true" : "false"}>
                    <div className={cls.GuideStep}>
                        <Step number={1} small/>
                        <div className={cls.GuideStepBox}>
                            <h1>Install cookies exporter for your browser.</h1>
                            <span>{link(CHROME_EXTENSION_LINK, "Chrome")} and {link(FIREFOX_EXTENSION_LINK, "Firefox")}</span>
                        </div>
                    </div>

                    <div className={cls.GuideStep}>
                        <Step number={2} small/>
                        <div className={cls.GuideStepBox}>
                            <h1>Open Apple Music web app and login into account you want to {isUploading ? "transfer" : "get"} the library.</h1>
                        </div>
                    </div>

                    <div className={cls.GuideStep}>
                        <Step number={3} small/>
                        <div className={cls.GuideStepBox}>
                            <h1>Open <a>Extensions</a> tab and select our just installed extension.</h1>
                            <Image
                                src="/steps/3.png"
                                alt=""
                                width={450}
                                height={450}
                            />
                        </div>
                    </div>

                    <div className={cls.GuideStep}>
                        <Step number={4} small/>
                        <div className={cls.GuideStepBox}>
                            <h1>Set <a>Export Format</a> to <a>JSON</a>.</h1>
                            <Image
                                src="/steps/4.png"
                                alt=""
                                width={450}
                                height={450}
                            />
                        </div>
                    </div>

                    <div className={cls.GuideStep}>
                        <Step number={5} small/>
                        <div className={cls.GuideStepBox}>
                            <h1>Click <a>Export</a>.</h1>
                            <Image
                                src="/steps/5.png"
                                alt=""
                                width={450}
                                height={450}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}