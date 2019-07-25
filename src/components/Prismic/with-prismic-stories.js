import React from 'react';
import Prismic from 'prismic-javascript';

const withPrismicStories = PlatformSpecificComponent => {
    return class extends React.Component {
        constructor() {
            super();
            this.apiEndpoint = 'https://des-lynham.prismic.io/api/v2';
            this.state = {
                prismicStories: null,
            }
        }

        componentWillMount = () => {
            const client = Prismic.client(this.apiEndpoint);
            client.query([
                Prismic.Predicates.at('document.type', 'news-story'),
                // Prismic.Predicates.at('document.type', 'news-story'),
            ]).then(res => {
                this.setState({ prismicStories: res.results });
            })
            .catch(err => {
                console.log('err is ', err);
            })
        }

        render() {
            return (
                <PlatformSpecificComponent
                    {...this.props}
                    prismicStories={this.state.prismicStories}
                />
            )
        }
    }
}

export default withPrismicStories;

// [ Prismic.Predicates.at('document.type', 'blog_post'),
//   Prismic.Predicates.at('document.tags', ['featured']) ]