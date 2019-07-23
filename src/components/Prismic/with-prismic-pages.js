import React from 'react';
import Prismic from 'prismic-javascript';

const withPrismicPages = PlatformSpecificComponent => {
    return class extends React.Component {
        constructor() {
            super();
            this.apiEndpoint = 'https://des-lynham.prismic.io/api/v2';
            this.state = {
                prismicPage: null,
            }
        }

        componentWillMount = () => {
            const client = Prismic.client(this.apiEndpoint);
            client.query([
                Prismic.Predicates.at('document.type', 'page-template'),
                // Prismic.Predicates.at('document.type', 'news-story'),
            ]).then(res => {
                this.setState({ prismicPage: res.results });
            })
            .catch(err => {
                console.log('err is ', err);
            })
        }

        render() {
            return (
                <PlatformSpecificComponent
                    {...this.props}
                    prismicPage={this.state.prismicPage}
                />
            )
        }
    }
}

export default withPrismicPages;

// [ Prismic.Predicates.at('document.type', 'blog_post'),
//   Prismic.Predicates.at('document.tags', ['featured']) ]