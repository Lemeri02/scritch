module Types
  class MutationType < Types::BaseObject
    field :update_moderator, mutation: Mutations::UpdateModerator
    field :delete_moderator, mutation: Mutations::DeleteModerator
    field :create_moderator, mutation: Mutations::CreateModerator

    field :update_announcement, mutation: Mutations::UpdateAnnouncement
    field :delete_announcement, mutation: Mutations::DeleteAnnouncement
    field :create_announcement, mutation: Mutations::CreateAnnouncement

    field :remove_suspension, mutation: Mutations::RemoveSuspension

    field :accept_claim, mutation: Mutations::AcceptClaim
    field :reject_claim, mutation: Mutations::RejectClaim
    field :accept_maker_claim, mutation: Mutations::AcceptMakerClaim
    field :reject_maker_claim, mutation: Mutations::RejectMakerClaim

    field :create_session, mutation: Mutations::CreateSession
    field :register_user, mutation: Mutations::RegisterUser
    field :send_new_confirm_mail, mutation: Mutations::SendNewConfirmMail
    field :update_password, mutation: Mutations::UpdatePassword
    field :reset_password, mutation: Mutations::ResetPassword
    field :email_sign_in, mutation: Mutations::EmailSignIn
    field :create_facebook_session, mutation: Mutations::CreateFacebookSession
    field :create_medium, mutation: Mutations::CreateMedium
    field :create_comment, mutation: Mutations::CreateComment
    field :delete_comment, mutation: Mutations::DeleteComment
    field :create_follow, mutation: Mutations::CreateFollow
    field :delete_follow, mutation: Mutations::DeleteFollow
    field :create_subscription, mutation: Mutations::CreateSubscription
    field :delete_subscription, mutation: Mutations::DeleteSubscription
    field :create_maker_subscription, mutation: Mutations::CreateMakerSubscription
    field :delete_maker_subscription, mutation: Mutations::DeleteMakerSubscription
    field :create_like, mutation: Mutations::CreateLike
    field :delete_like, mutation: Mutations::DeleteLike
    field :create_fave, mutation: Mutations::CreateFave
    field :delete_fave, mutation: Mutations::DeleteFave
    field :delete_session, mutation: Mutations::DeleteSession
    field :delete_fursuit_user, mutation: Mutations::DeleteFursuitUser
    field :delete_user, mutation: Mutations::DeleteUser
    field :update_user, mutation: Mutations::UpdateUser
    field :delete_medium, mutation: Mutations::DeleteMedium
    field :update_medium, mutation: Mutations::UpdateMedium
    field :read_activities, mutation: Mutations::ReadActivities
    field :read_announcements, mutation: Mutations::ReadAnnouncements
    field :read_fursuit_notifications, mutation: Mutations::ReadFursuitNotifications
    field :read_maker_notifications, mutation: Mutations::ReadMakerNotifications
    field :read_media_notifications, mutation: Mutations::ReadMediaNotifications
    field :clear_activities, mutation: Mutations::ClearActivities
    field :create_message, mutation: Mutations::CreateMessage
    field :read_chat, mutation: Mutations::ReadChat
    field :create_report, mutation: Mutations::CreateReport
    field :create_medium_report, mutation: Mutations::CreateMediumReport
    field :create_comment_report, mutation: Mutations::CreateCommentReport
    field :create_tag_report, mutation: Mutations::CreateTagReport
    field :create_tech_report, mutation: Mutations::CreateTechReport
    field :block_user, mutation: Mutations::BlockUser
    field :unblock_user, mutation: Mutations::UnblockUser
    field :create_advert, mutation: Mutations::CreateAdvert
    field :create_asset_request, mutation: Mutations::CreateAssetRequest
    field :create_claim, mutation: Mutations::CreateClaim
    field :create_maker_claim, mutation: Mutations::CreateMakerClaim

    field :remove_user_avatar, mutation: Mutations::RemoveUserAvatar
    field :remove_user_bio, mutation: Mutations::RemoveUserBio
    field :remove_user_website, mutation: Mutations::RemoveUserWebsite

    field :accept_serious_violation, mutation: Mutations::AcceptSeriousViolation
    field :accept_minor_violation, mutation: Mutations::AcceptMinorViolation
    field :reject_not_worth_reporting, mutation: Mutations::RejectNotWorthReporting

    field :update_fursuit, mutation: Mutations::UpdateFursuit
    field :delete_fursuit, mutation: Mutations::DeleteFursuit
    field :create_fursuit, mutation: Mutations::CreateFursuit

    field :update_maker, mutation: Mutations::UpdateMaker
    field :delete_maker, mutation: Mutations::DeleteMaker
    field :create_maker, mutation: Mutations::CreateMaker

    field :update_event, mutation: Mutations::UpdateEvent
    field :delete_event, mutation: Mutations::DeleteEvent
    field :create_event, mutation: Mutations::CreateEvent

    field :update_edition, mutation: Mutations::UpdateEdition
    field :delete_edition, mutation: Mutations::DeleteEdition
    field :create_edition, mutation: Mutations::CreateEdition

    field :create_fursuit_request, mutation: Mutations::CreateFursuitRequest
    field :reject_fursuit_request, mutation: Mutations::RejectFursuitRequest

    field :reject_maker_request, mutation: Mutations::RejectMakerRequest

    field :reject_event_request, mutation: Mutations::RejectEventRequest

    field :delete_ticket, mutation: Mutations::DeleteTicket

    field :accept_advert, mutation: Mutations::AcceptAdvert
    field :reject_advert, mutation: Mutations::RejectAdvert
    field :update_advert, mutation: Mutations::UpdateAdvert
    field :delete_advert, mutation: Mutations::DeleteAdvert

    field :tag_lock_medium, mutation: Mutations::TagLockMedium
    field :tag_unlock_medium, mutation: Mutations::TagUnlockMedium
  end
end
