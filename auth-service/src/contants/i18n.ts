export enum Languages {
  EN = 'en',
  PL = 'pl',
}

export class TranslationsKeys {
  static readonly userNotFoundOrPasswordNotMatching =
    'user_not_found_or_password_not_matching';
  static readonly userAlreadyExistsEmail = 'user_already_exists_email';
  static readonly userAlreadyExistsNickname = 'user_already_exists_nickname';
  static readonly cannotActivateAccount = 'cannot_activate_account';
  static readonly accountAlreadyActivated = 'account_already_activated';
  static readonly accountNotActivated = 'account_not_activated';
  static readonly userAlreadyInvited = 'user_already_invited';
  static readonly invitationNotExisting = 'invitation_not_existing';
  static readonly friendsNotExisting = 'friends_not_existing';
  static readonly friendsAlreadyExisting = 'friends_already_existing';
  static readonly cannotInviteSelf = 'invitations_cannot_invite_self';
  static readonly cannotFindUser = 'cannot_find_user';
}
