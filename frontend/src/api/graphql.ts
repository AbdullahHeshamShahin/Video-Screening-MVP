import { gql } from "@apollo/client";

export const GET_VIDEO = gql`
  query GetVideo($id: String!) {
    video(inviteId: $id) {
      inviteId
      url
      tags
    }
  }
`;

export const CREATE_INVITE = gql`
  mutation CreateInvite($id: String!) {
    createInvite(inviteId: $id)
  }
`;

export const ADD_TAG = gql`
  mutation AddTag($id: String!, $tag: String!) {
    addTag(inviteId: $id, tag: $tag) {
      inviteId
      url
      tags
    }
  }
`;

export const REMOVE_TAG = gql`
  mutation RemoveTag($id: String!, $tag: String!) {
    removeTag(inviteId: $id, tag: $tag) {
      inviteId
      url
      tags
    }
  }
`;
