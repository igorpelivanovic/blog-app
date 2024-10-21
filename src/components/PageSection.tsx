import { memo } from "react"

type PageSectionProps = {
    children: React.ReactNode,
    sectionTitle: React.ReactNode
}
const PageSection = ({ sectionTitle, children }: PageSectionProps) => {
    return(
        <section className="flex flex-col gap-5">
            <h2 className="capitalize text-3xl font-semibold">{sectionTitle}</h2>
            {children}
        </section>
    )
}


export default memo(PageSection)