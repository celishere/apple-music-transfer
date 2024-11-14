import Link from "next/link";

import { GithubIcon } from "@/shared/icons/GithubIcon";

import cls from "./GithubLink.module.scss";

const GITHUB_LINK_URL = "https://github.com/celishere/AppleMusicTransfer";

export const GithubLink = () => (
    <Link className={cls.GithubLink} href={GITHUB_LINK_URL} passHref>
        <GithubIcon />
    </Link>
)