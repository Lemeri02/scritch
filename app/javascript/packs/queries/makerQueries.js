import gql from "graphql-tag";

export const LOAD_MAKERS = gql`
  query Makers(
    $name: String
    $country: String
    $region: String
    $limit: Int!
    $offset: Int!
  ) {
    makers(
      name: $name
      country: $country
      region: $region
      limit: $limit
      offset: $offset
    ) {
      id
      name
      country
      slug
    }
  }
`;

export const LOAD_MAKER = gql`
  query Maker($id: ID!) {
    maker(id: $id) {
      id
      name
      slug
      web
      country
      region
      avatar
      claimed
      possessed
      user {
        id
        name
      }
      fursuits {
        id
        name
        fursuitSpecy {
          id
          name
        }
        slug
      }
    }
  }
`;

export const LOAD_MAKER_COUNTRIES = gql`
  query makersCountry {
    makersCountry
  }
`;

export const LOAD_MAKER_REGIONS = gql`
  query makersRegion($country: String!) {
    makersRegion(country: $country)
  }
`;
