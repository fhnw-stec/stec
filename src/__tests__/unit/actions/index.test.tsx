import {MockStecService} from '../../../api/__mocks__/MockStecService';
import {loadStepsImpl} from '../../../actions/index';

describe('actions', () => {

    const service = new MockStecService();

    it('should load steps', async () => {
        expect.assertions(1);
        const steps = await loadStepsImpl(service);
        expect(steps).toEqual([
            {tag: 'step-1', title: 'Step One', readme: 'Mock README step-1'},
            {tag: 'step-2', title: 'Step Two', readme: 'Mock README step-2'}
        ]);
    });

});