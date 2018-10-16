ActiveAdmin.register Medium do
  permit_params :user_id, :title, :description

  action_item :accept, only: [:show, :edit] do
    link_to('Accept and encode', accept_admin_medium_path(resource), method: :put)
  end

  member_action :accept, method: :put do
    resource.push_video_encoding_job!
    redirect_to resource_path, notice: "Medium accepted"
  end

  config.sort_order = 'created_at_desc'

  filter :user
  filter :id
  filter :created_at

  index do
    selectable_column
    id_column

    column :status do |record|
      record.video_encoding_job&.state
    end

    column :user
    column :created_at
    column :updated_at

    actions
  end

  show do
    attributes_table do
      row :id
      row :user
      row :video do |record|
        video(width: 640, height: 480, controls: true) do
          source(src: "https://s3.amazonaws.com/#{ENV['TEMPORARY_S3_BUCKET']}/#{record.temporary_key}")
        end
      end
      row :temporary_file do |record|
        link_to "Download", "https://s3.amazonaws.com/#{ENV['TEMPORARY_S3_BUCKET']}/#{record.temporary_key}"
      end
      row :created_at
      row :updated_at
    end
  end

  form do |f|
    f.inputs "Associations" do
      f.input :user
    end
    f.inputs "Medium Details" do
      f.input :id
      f.input :title
      f.input :description
    end
    f.actions
  end
end
