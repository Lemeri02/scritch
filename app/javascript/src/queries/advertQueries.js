import gql from "graphql-tag";

export const GET_ADVERTS = gql`
  query Adverts($uuid: ID, $limit: Int!) {
    adverts(uuid: $uuid, limit: $limit) {
      id
      file
      url
      isPlaceholder
    }
  }
`;

export const GET_TOOLTIP = gql`
  query Tooltip($uuid: ID) {
    tooltip(uuid: $uuid) {
      id
      file
    }
  }
`;

export const GET_TOOLTIPS = gql`
  query Tooltips {
    tooltips {
      id
      category
      aspect
      topic
      body
      name
    }
  }
`;
