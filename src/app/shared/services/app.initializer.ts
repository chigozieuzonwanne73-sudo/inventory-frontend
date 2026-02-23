// Create file: src/app/core/initializers/app.initializer.ts
import { JwtAuthService } from '../../shared/services/auth/jwt-auth.service';
import { NavigationService } from '../../shared/services/navigation.service';

export function initializeAppFactory(
    jwtAuth: JwtAuthService,
    navService: NavigationService
) {
    return () => {
        const storedUser = jwtAuth.getUser();
        const storedToken = jwtAuth.getJwtToken();

        if (storedUser && storedToken && !jwtAuth.isTokenExpired()) {
            // Restore user state from localStorage
            jwtAuth.user$.next(storedUser);
            navService.publishMenuByRole(storedUser.role);
            console.log('App initialized with user:', storedUser);
        } else if (storedToken && jwtAuth.isTokenExpired()) {
            // Clear expired session
            console.log('Token expired on app init, clearing session');
            jwtAuth.signout();
        }
    };
}