import * as React from 'react'
import ProfileDescription from './Nav'
import { ICollection, UserProfile, ISection } from '../../types'
import Section from './Section'
import styled from 'styled-components'
import { Box } from 'grommet'
import { NextSeo } from 'next-seo'
import { Layout } from './Layout'
import { useRouter } from 'next/router'
import { SectionMenu } from '../SectionMenu'

const ContentBox = styled(Box)`
    margin-top: 40px;
    @media screen and (max-width: 812px) {
        margin-top: 8px;
        padding-right: 0px;
        padding-left: 0px;
    }
`

export const getDefaultSection = (sections: ISection[]): ISection => {
    const minimumIndex = Math.min(...sections.map(x => x.index))
    const defaultSection = sections.find(x => x.index === minimumIndex)
    if (defaultSection === undefined) {
        throw Error('No default section')
    }
    return defaultSection
}

export interface IProfilePageProps {
    sections: ISection[]
    activeSection: ISection
    user: UserProfile
}

export default function ProfilePage(props: IProfilePageProps) {
    const router = useRouter()

    return (
        <Layout>
            <NextSeo
                title={`${props.user.firstname} - Tottem`}
                description={`${props.user.firstname} on Tottem - ${props.user.biography}`}
                canonical={`https://tottem.app/${router.query.profile}/${props.activeSection.id}`}
                twitter={{
                    site: '@TottemApp',
                    cardType: 'summary',
                }}
                openGraph={{
                    type: 'profile',
                    profile: {
                        username: props.user.slug,
                    },
                    description: `${props.user.firstname} on Tottem - ${props.user.biography}`,
                    url: `https://tottem.app/${router.query.profile}`,
                    site_name: 'Tottem',
                    images: [
                        {
                            url: `https://tottem.app${props.user.pictureUrl}`,
                        },
                    ],
                }}
            />
            <Box direction="row">
                <Box>
                    <ProfileDescription {...props.user} />
                    <ContentBox pad={{ horizontal: 'large' }}>
                        <SectionMenu sections={props.sections} />
                        <Section
                            collections={props.activeSection.collections}
                        />
                    </ContentBox>
                </Box>
                {/* <AppTableOfContents collections={sections[1].collections} /> */}
            </Box>
        </Layout>
    )
}
