import gql from 'graphql-tag';

export const CREATE_CHAT_MUTATION = gql`
mutation CreateChatMutation($content: String!, $from: String!, $img: String!) {
  createChat(content: $content, from: $from, img: $img) {
    id
    createdAt
    from
    content
    img
  }
}
`;

export const ALL_CHATS_QUERY = gql`
    query AllChatsQuery {
        allChats {
            id
            createdAt
            from
            content
            img
        }
    }
`;