export declare const swaggerConfig: {
    cache: {
        duration: number;
        maxSize: number;
    };
    ui: {
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
    api: {
        title: string;
        description: string;
        version: string;
        contact: {
            name: string;
            email: string;
        };
        license: {
            name: string;
            url: string;
        };
    };
    servers: {
        url: string;
        description: string;
    }[];
};
//# sourceMappingURL=swagger.config.d.ts.map