class Mutations::CreateCommentReport < Mutations::BaseMutation
  argument :comment_id, ID, required: true
  argument :description, String, required: true

  field :report, Types::ReportType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    report = CommentReport.new(arguments)
    report.reporter = context[:current_user]

    raise Pundit::NotAuthorizedError unless ReportPolicy.new(context[:current_user], report).create?

    if report.save
      {
        report: report,
        errors: [],
      }
    else
      {
        report: nil,
        errors: report.errors.full_messages
      }
    end
  end
end
