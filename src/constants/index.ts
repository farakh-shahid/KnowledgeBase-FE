export const LABELS = {
  SLOGAN: 'Your Knowledge book',
  GOOGLE: 'Continue with Google',
  SIGN_IN: 'Sign In',
  FORGOT_PASSWORD: 'Forgot Password?',
  ALREADY_HAVE_ACCOUNT: 'Already have an account?',
  SIGNUP: 'SignUp',
  BACK_TO_LOGIN: 'Back to login',
  SEND_RESET_EMAIL: 'Send Reset Password Email',
  SEND_INVITES: 'Send invite to Emails',
  INVITE_PEOPLE: 'Invite People',
  RESET_PASSWORD: 'Reset Password',
  WELCOME: 'Welocom Back',
  RESET:
    'Please provide your E-mail Address, \n We will send you an email that will allow you to reset your password',
  INVITE:
    'Please Provide the Emails of people you want to send them invites...',
  NEW_POST: 'New post title here...',
  CREATE_POST: 'Create Post',
  ANSWERED_BY: 'Answered By',
  POST_FEEDBACK: 'Post your Feedback',
  ASKED_BY: 'Asked By',
  LINKED: 'Linked',
  GIVE_FEEDBACK: 'Give your Opinion',
  NO_ANSWERS: 'No Answer Yet',
  ADD_ROLE: 'Add Role',
  VIEW_PERMISSIONS: 'View Permissions',
  EDIT_ROLE_PERMISSIONS: 'Edit Role & Permissions ',
  UPDATE_ROLE: 'Update Role ',
  CANCEL: 'Cancel',
  CHECK_ALL: 'Check All',
  ADD_OR_EDIT: 'Add/Edit Tenant',
  UPDATE_TENANT: 'Update Tenant',
  ADD_TENANT: 'Add Tenant',
  YES_DELETE_IT: 'Yes, delete it!',
  INVITE_USERS: 'Invite User',
  USER_NAME: 'User Name',
  PICTURE: 'picture',
  NAME: 'name',
};
export const PLACEHOLDER = {
  EMAIL: 'Email Address',
  PASSWORD: 'Password',
  FIRSTNAME: 'First Name',
  LASTNAME: 'Last Name',
  CONFIRM_PASSWORD: 'Confirm Password',
  SEARCH: 'Search Knowledgebook',
  ADD_TAGS: 'Add upto 4 tags...',
  WRITE_SOMETHING: 'Write something awesome...',
  INVITE_EMAIL: 'Type or paste email addresses and press `Enter`...',
  ADD_ROLE_TITLE_HERE: 'Add Role Title Here ...',
  ADD_TENANTS_NAME: 'Enter Tenant Name here ...',
  ADD_DOMAIN_HERE: 'Add Domain Here ...',
  ENTER_SUBDOMAN: 'Enter subdomains and press Enter',
};
export const INPUT_TYPES = {
  EMAIL: 'email',
  PASSWORD: 'password',
  TEXT: 'text',
  FILE: 'file',
  SEARCH: 'search',
};
export const MESSAGES = {
  LOGIN_SUCCESSFULLY: 'Login Successfully',
  ERROR_WHILE_LOGING_IN: 'Error occured while logining in',
  USER_REGISTERED_SUCCESSFULLY: 'User Registered Successfully',
  SIGN_UP_ERROR: 'Error occured While Registering User',
  PASSWORD_NOT_MATCHED: 'Password not match',
  INVITE_FAILD: 'Invite to users Failed',
  ERROR: 'Error Occured',
  ERROR_WHILE_LOADING_DATA: 'Error While Loading Data',
  TOPIC_CREATED: 'Topic Created Successfully',
  TAG_ERROR: 'You can only add upto 4 tags...',
  TITLE_EMPTY: 'title cannot be empty!',
  CONTENT_EMPTY: 'content cannot be empty!',
  TAGS_EMPTY: 'Enter atleast one tag',
  ERROR_SEARCHING: 'Could Not Load Data',
  PROFILE_UPDATED: 'Profile Updated Successfully',
  COULD_NOT_UPDATE_PROFILE: 'Could not Update Profile',
  SEE_LESS: 'See Less',
  SEE_ALL: 'See All',
  FEEDBACK_SUBMITTED: 'Your feedback submitted Successfully',
  PERMISSION_TITLE_NOT_SET: 'Permissions and Role Title have not been set',
  UPDATED_SUCCESSFULLY: 'Updated Successfully',
  CREATED_SUCCESSFULLY: 'Created Successfully',
  CANNOT_UPDATE: 'Cannot Update',
  CANNOT_CREATE: 'Cannot Create',
  ROLE_DELETED_SUCCESSFULLY: 'Deleted Successfully',
  CANNOT_DELETE_ROLE: 'Cannot Delete Role',
  TENANT_UPDATED: 'Tenant Update Successfully',
  TENANT_CREATED: 'Tenant Created Successfully',
  COULD_NOT_UPDATE_TENANT: 'Could Not Update Tenant',
  TENANT_DELETED_SUCCESSFULLY: 'Tenant Deleted Successfully',
  CANNOT_DELETE_TENANT: 'Cannot Delete Tenant',
  TENANTS: 'Tenants',
  ARE_YOU_SURE: 'Are you sure?',
  YOU_WONT_BE_ABLE_TO_REVERT: "You won't be able to revert this!",
  FILE_SIZE_EXCEED: 'File size too large. Please select a file under 5 MB',
  CANNOT_UPLOAD_PICTURE: 'Cannot Upload Picture',
  IMAGE_UPLOADED: 'Image Uploaded Successfully',
  FAILE_TO_REMOVE: 'Failed To remove picture',
  USER_DELETED_SUCCESSFULLY: ' User Deleted Successfully',
};

export const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const getProfileAvatar = (userName: string | undefined) =>
  `https://ui-avatars.com/api/?name=${userName}&background=fff&bold=true`;
export const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const CATEGORY = 'CATEGORY';
export const TAG = 'TAG';
export const roles = [
  { name: 'Questions', key: 'question' },
  { name: 'Demographics', key: 'demographics' },
  { name: 'Invite', key: 'invite' },
  { name: 'Roles', key: 'roles' },
  { name: 'Users', key: 'users' },
  { name: 'Answers', key: 'content' },
  { name: 'Reaction', key: 'reactions' },
];
export const PERMISSIONS_HEADER = ['READ', 'WRITE', 'UPDATE', 'DELETE'];
export const IMAGE_SIZE = '5000000';
export const IMAGE_REGEX = /<img[^>]+src="([^">]+)"/g;
export const columnWidths: any = {
  picture: 210,
  email: 210,
  tenantName: 160,
  role: 200,
};
