import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getSuperadminData() {
    // Data khusus superadmin
    return {
      message: 'Data rahasia superadmin',
      stats: {
        totalUsers: 1200,
        activeAdmins: 15,
      },
    };
  }

  getAdminData() {
    // Data khusus admin
    return {
      message: 'Data khusus admin',
      reports: ['Report A', 'Report B'],
    };
  }

  getUserData() {
    // Data khusus user
    return {
      message: 'Data user biasa',
      activities: ['Order #123', 'Order #456'],
    };
  }
}