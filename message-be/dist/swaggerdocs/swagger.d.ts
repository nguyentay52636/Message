import swaggerUi from 'swagger-ui-express';
export declare const swaggerSpec: any;
export { swaggerUi };
export declare const swaggerUiOptions: {
    explorer: boolean;
    customCss: string;
    customSiteTitle: string;
    customfavIcon: string;
    swaggerOptions: {
        docExpansion: string;
        filter: boolean;
        showRequestDuration: boolean;
        tryItOutEnabled: boolean;
        requestInterceptor: (req: any) => any;
        responseInterceptor: (res: any) => any;
        defaultModelsExpandDepth: number;
        defaultModelExpandDepth: number;
        displayRequestDuration: boolean;
        displayOperationId: boolean;
        onComplete: () => void;
        onFailure: (data: any) => void;
    };
};
export declare const refreshSwaggerCache: () => any;
//# sourceMappingURL=swagger.d.ts.map