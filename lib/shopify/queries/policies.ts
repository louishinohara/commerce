export const getPolicyQuery = /* GraphQL */ `
  query getPolicy($handle: String!) {
    shop {
      privacyPolicy {
        title
        body
        handle
      }
      termsOfService {
        title
        body
        handle
      }
      refundPolicy {
        title
        body
        handle
      }
    }
  }
`;

export const GET_ALL_POLICIES_QUERY = /* GraphQL */ `
query getAllPolicies {
  shop {
    privacyPolicy {
      title
      body
      handle
    }
    termsOfService {
      title
      body
      handle
    }
    refundPolicy {
      title
      body
      handle
    }
  }
}
`;