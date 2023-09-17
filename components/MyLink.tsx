// 書き方用のメモ
import { default as Link } from 'next/link';

export const MyLink = ({ children, href }: any) => {
    return (
        <Link href={href}>{children}</Link>
    )
}