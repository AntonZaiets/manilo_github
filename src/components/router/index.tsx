// import * as React from 'react';
// import {
//   RouteProps,
//   Route,
//   RedirectProps,
//   Redirect,
//   useLocation,
// } from 'react-router';
// import { TRole } from 'shared/interfaces';
// import { useAppSelector, useAppDispatch } from 'store/hooks';
// import { selectUserRoles, saveRedirectUrl } from 'store/userSlice';
//
// export const RoleRoute: React.FC<IRedirect & {
//   roles: Array<TRole>;
// } & RouteProps> = props => {
//   const { roles, ...rest } = props;
//   const userRoles = useAppSelector(selectUserRoles);
//   return (
//     <ConditionRouter
//       condition={roles.some(role => userRoles.includes(role))}
//       {...rest}
//     />
//   );
// };
//
// export const ConditionRouter = ({
//   condition,
//   redirect,
//   ...rest
// }: TConditionRoute) =>
//   condition ? <Route {...rest} /> : <RedirectEx to={redirect || '/'} />;
//
// export const RoleRedirect = ({ rolesOptions }: TRoleRedirect) => {
//   const userRoles = useAppSelector(selectUserRoles);
//
//   const redirectProps = rolesOptions.find(
//     (item: TRolesOptions) =>
//       !item.roles || item.roles.some(role => userRoles.includes(role)),
//   );
//
//   return redirectProps && <RedirectEx {...redirectProps} />;
// };
//
// type TConditionRoute = IRedirect & ICondition & RouteProps;
// type TRolesOptions = { roles?: TRole[]; to: string };
// type TRoleRedirect = Partial<RedirectProps> & {
//   rolesOptions: Array<TRolesOptions>;
// };
//
// export const RedirectEx: React.FC<RedirectProps> = props => {
//   const dispatch = useAppDispatch();
//   const { pathname, search } = useLocation();
//   dispatch(saveRedirectUrl(pathname + search));
//   return <Redirect {...props} />;
// };
//
// interface IRedirect {
//   redirect?: string;
// }
//
// interface ICondition {
//   condition?: boolean;
// }
//
// export * from './AuthenticationGuard';
