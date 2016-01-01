import { expect } from 'chai'
import * as array from '../../../src/utils/array';


describe('utils/array', () => {

    describe('#indexOf(arr, item)', () => {

        let arr = [1, 2, 3];

        it('should return the index of `item` when found in `arr`', ()=> {

            for (let i = 0, l = arr.length; i < l; i++) {
                expect(array.indexOf(arr, arr[i])).to.equal(i);
            }
        });

        it('should return -1 when `item` is not present', () => {

            expect(array.indexOf(arr, 4)).to.equal(-1);
            expect(array.indexOf(null, 2)).to.equal(-1);
        });

        it('should return -1 when `arr` is falsely or not an array', () => {
            expect(array.indexOf(undefined, 1)).to.equal(-1);
            expect(array.indexOf(null, 1)).to.equal(-1);
            expect(array.indexOf(1, 1)).to.equal(-1);
            expect(array.indexOf('1', 1)).to.equal(-1);
        });
    });

});
