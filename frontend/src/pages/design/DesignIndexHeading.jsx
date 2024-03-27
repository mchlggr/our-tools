import React, {memo} from 'react';
import PropTypes from 'prop-types';
import Heading from "../../components/Heading";


const DesignIndexHeading = (props) => {
    const {createDesign} = props
    return (
        <>
            <div className="max-w-7xl mx-auto">
                <div className="pb-5 border-b border-gray-200 flex sm:items-center sm:justify-between">
                    <header>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold leading-tight text-gray-900">My Designs</h1>
                        </div>
                    </header>
                    <div className="mt-3 flex sm:mt-0 sm:ml-4 px-4 sm:px-6 lg:px-8">
                        <button
                            onClick={createDesign}
                            type="button"
                            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

DesignIndexHeading.propTypes = {};

const DesignIndexHeadingMemo = memo(DesignIndexHeading)
DesignIndexHeadingMemo.displayName = "DesignIndexHeading"

export default DesignIndexHeadingMemo;