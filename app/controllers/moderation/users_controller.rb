class Moderation::UsersController < ModerationController
  before_action :load_user, only: [
    :show,
    :moderate_profile,
    :ban_and_remove_account,
    :ban_permanently,
    :ban_for_a_month,
    :minor_user_violation,
    :serious_user_violation,
    :minor_medium_violation,
    :serious_medium_violation,
    :minor_comment_violation,
    :serious_comment_violation,
    :not_worth_report
  ]

  def show
  end

  def moderate_profile
    if params[:clear_avatar].present?
      @user.remove_avatar!
      @user.save!

      delete_avatar_telegram_message!
    end

    if params[:clear_bio].present?
      @user.update(bio: nil)
    end

    if params[:clear_website].present?
      @user.update(clear_website: nil)
    end

    if params[:pictures_to_delete].present?
      Picture.where(uuid: Array(params[:pictures_to_delete])).destroy_all
    end

    accept_all_reports if params[:submit_and_close].present?

    redirect_back fallback_location: moderation_user_path(@user)
  end

  def ban_and_remove_account
    ban_and_redirect!(delete_account: true)
  end

  def ban_permanently
    ban_and_redirect!
  end

  def serious_user_violation
    @user.update!(score: @user.score - 100) #__SCORE__ SERIOUS MEDIUM VIOLATION
    accept_all_user_reports(params[:profile_id])
    #User.find(params[:profile_id]).destroy TODO MODERATE PROFILE
    ## TODO HIATUS ON ACCOUNT
    redirect_back fallback_location: moderation_reports_path
  end

  def minor_user_violation
    @user.update!(score: @user.score - 10) #__SCORE__ MINOR MEDIUM VIOLATION
    accept_all_user_reports(params[:profile_id])
    #User.find(params[:profile_id]).destroy TODO MODERATE PROFILE
    redirect_back fallback_location: moderation_reports_path
  end

  def serious_medium_violation
    @user.update!(score: @user.score - 100) #__SCORE__ SERIOUS MEDIUM VIOLATION
    accept_all_medium_reports(params[:medium_id])
    Medium.find(params[:medium_id]).destroy
    ## TODO HIATUS ON ACCOUNT
    redirect_back fallback_location: moderation_medium_reports_path
  end

  def minor_medium_violation
    @user.update!(score: @user.score - 10) #__SCORE__ MINOR MEDIUM VIOLATION
    accept_all_medium_reports(params[:medium_id])
    Medium.find(params[:medium_id]).destroy
    redirect_back fallback_location: moderation_medium_reports_path
  end

  def serious_comment_violation
    @user.update!(score: @user.score - 100) #__SCORE__ SERIOUS COMMENT VIOLATION
    accept_all_comment_reports(params[:comment_id])
    Comment.find(params[:comment_id]).destroy
    ## TODO HIATUS ON ACCOUNT
    redirect_back fallback_location: moderation_comment_reports_path
  end

  def minor_comment_violation
    @user.update!(score: @user.score - 10) #__SCORE__ MINOR COMMENT VIOLATION
    accept_all_comment_reports(params[:comment_id])
    Comment.find(params[:comment_id]).destroy
    redirect_back fallback_location: moderation_comment_reports_path
  end

  def not_worth_report
    @user.update!(score: @user.score - 10) #__SCORE__ BAD REPORT
    if params[:comment_id].present?
      if params[:submit_and_close].present? && params[:comment_id].present?
        accept_all_comment_reports(params[:comment_id])
      else
        CommentReport.find(params[:report_id]).update(status: 'accepted')
      end
      redirect_back fallback_location: moderation_comment_reports_path
    elsif params[:medium_id].present?
      if params[:submit_and_close].present? && params[:medium_id].present?
        accept_all_medium_reports(params[:medium_id])
      else
        MediumReport.find(params[:report_id]).update(status: 'accepted')
      end
      redirect_back fallback_location: moderation_medium_reports_path
    elsif params[:profile_id].present?
      if params[:submit_and_close].present? && params[:profile_id].present?
        accept_all_profile_reports(params[:profile_id])
      else
        Report.find(params[:report_id]).update(status: 'accepted')
      end
      redirect_back fallback_location: moderation_reports_path
    end
  end

  protected

  def load_user
    @user = User.find(params[:user_id])
  end

  def delete_avatar_telegram_message!
    Telegram::DeleteModerationMessageService.new(@user).call
  end

  def accept_all_user_reports(profile_id)
    Report.where(status: 'new', user_id: profile_id).update(status: 'accepted')
  end

  def accept_all_comment_reports(comment_id)
    CommentReport.where(status: 'new', comment_id: comment_id).update(status: 'accepted')
  end

  def accept_all_medium_reports(medium_id)
    MediumReport.where(status: 'new', medium_id: medium_id).update(status: 'accepted')
  end

end
