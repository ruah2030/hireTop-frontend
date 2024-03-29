export default function apiRoute() {
  return {
    login: "/api/login",
    register: "/api/register",
    logout: "/api/logout",
    offers: "/api/offers",
    offers_paginate: "/api/offers/paginate",
    user_partial_update: "/api/users/partial/update",
    user_org_meta: "/api/users/org/meta",
    get_user_org_meta: "/api/users/meta",
    change_password: "/api/users/change/password",
  };
}
