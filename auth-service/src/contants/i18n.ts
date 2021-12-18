export enum Languages {
  EN = 'en',
  PL = 'pl',
}

export class TranslationsKeys {
  static readonly userNotFoundOrPasswordNotMatching =
    'user_not_found_or_password_not_matching';
  static readonly userAlreadyExists = 'user_already_exists';
  static readonly cannotActivateAccount = 'cannot_activate_account';
  static readonly accountAlreadyActivated = 'account_already_activated';
  static readonly accountNotActivated = 'account_not_activated';
  static readonly userAlreadyInvited = 'user_already_invited';
  static readonly invitationNotExisting = 'invitation_not_existing';
}
