<?php
/**
 * Admin panel settings.
 *
 * DEFAULT_PASSWORD_HASH is only the starting password (a bcrypt hash; the
 * password itself is not stored anywhere in the code). Change it from
 * "Change password" in the admin panel; the new one is saved in the data
 * folder and replaces this one.
 */
const ADMIN_USERNAME = 'admin';
const DEFAULT_PASSWORD_HASH = '$2y$10$lvDlKPm1IMLBOLIYAXiRe.hUWDFfFo.iytZimu62tcijVPQ1D23cy';
const SESSION_NAME = 'bic_admin';
const SESSION_LIFETIME = 4 * 60 * 60;   // seconds
const MAX_LOGIN_ATTEMPTS = 5;           // then locked for LOCKOUT_SECONDS
const LOCKOUT_SECONDS = 15 * 60;
