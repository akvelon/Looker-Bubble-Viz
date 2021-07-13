import { Looker, VisualizationDefinition } from './common/types';

declare var looker: Looker;

const vis: VisualizationDefinition = {
    id: 'someId', // id/label not required, but nice for testing and keeping manifests in sync
    label: 'Some Label',
    options: {
        title: {
            type: 'string',
            label: 'Title',
            display: 'text',
            default: 'Some Name'
        }
    },
    // Set up the initial state of the visualization
    create(element, config) {
        this.elementRef = element;
        console.log('created');
    },
    // Render in response to the data or settings changing
    update(data, element, config, queryResponse) {
        console.log( 'data', data );
        console.log( 'element', element );
        console.log( 'config', config );
        console.log( 'queryResponse', queryResponse );
    }
};

looker.plugins.visualizations.add(vis);
