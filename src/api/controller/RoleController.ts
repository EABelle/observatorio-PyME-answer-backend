import {NextFunction, Response, Request} from 'express';
import {RoleService} from '../../core/service/RoleService';
import {Role} from '../../core/domain/Role';
import {RolePayload, RoleResponse} from '../contract';
import {validationResult} from 'express-validator';
import {transform, transformList} from '../../core/transformer/roleTransformer';

export class RoleController {

    public static async getRoles(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const roles: Role[] = await RoleService.getRoles();
            const rolesResponse: RoleResponse[] = transformList(roles);
            return res.json(rolesResponse);
        } catch (e) {
            return next(new Error(e.message));
        }
    }

    public static async getRole(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.params.id;
        try {
            const role: Role = await RoleService.getRole(id);
            if (!role) {
                return res.status(404).json({message: 'Role not found'});
            }
            const response: RoleResponse = transform(role);
          return res.json(response);
        } catch (e) {
          return next(new Error(e.message));
        }
    }

    public static async createRole(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const roleRequest: RolePayload = req.body;
            const role: Role = await RoleService.createRole(roleRequest);
            const roleResponse: RoleResponse = transform(role);
          return res.json(roleResponse);
        } catch (e) {
          return next(new Error(e.message));
        }
    }

    public static async updateRole(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        const roleRequest: RolePayload = req.body;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.params.id;
        try {
            const role: Role | null = await RoleService.updateRole(id, roleRequest);
            if (!role) {
                return res.status(404).json({message: 'Role not found'});
            }
            const roleResponse: RoleResponse = transform(role);
            return res.json(roleResponse);
        } catch (e) {
            return next(new Error(e.message));
        }
    }

    public static async deleteRole(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.params.id;
        try {
            const deleteCount: number = await RoleService.deleteRole(id);
            if (!deleteCount) {
                return res.status(404).json({message: 'role not found to delete'});
            }
            return res.json({message: `deleted`});
        } catch (e) {
            return next(new Error(e.message));
        }
    }
}
