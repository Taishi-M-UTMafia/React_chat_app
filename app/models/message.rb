class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :friendship

  validates :content,       presence: true, length: { maximum: 50 }
  validates :from_user_id,  presence: true
  validates :chat_room_id,  presence: true
  validates :message_type,  presence: true

  enum message_type: { text: 'text', image: 'image' }

end
