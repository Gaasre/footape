import type { Action, Position, Section } from "./enums";
import type { Permission } from "./interfaces";

export const groupBy = <T, K extends string | number | symbol, O extends keyof any>(arr: T[], key: (i: T) => K, returnKey: (i: T) => O) =>
    arr.reduce((groups, item) => {
        (groups[key(item)] ||= []).push(returnKey(item));
        return groups;
    }, {} as Record<K, O[]>);

export const checkPermission = (permissions: Permission | undefined, section: Section, action: Action, role: Position | undefined) => {
    if (role == 'Owner') {
        return true
    }
    if (!permissions) {
        return false
    }
    if (permissions[section]) {
        return permissions[section]?.includes(action)
    }
    return false
}