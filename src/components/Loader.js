//@flow
import *as React from 'react';

export const Loader = (): React.Node => (
    <div className="text-center">
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
)