import JobModel from '../../../../ui/models/job';
import { getProjectUrl } from "../../../../ui/helpers/urlHelper";
import * as jasmine from 'jasmine-ajax';

describe('JobModel', () => {

    var $httpBackend,
        $timeout,
        foregroundRepo = "mozilla-central",
        ThJobModel;

    beforeEach(angular.mock.module('treeherder'));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $timeout = $injector.get('$timeout');
        jasmine.getJSONFixtures().fixturesPath='base/tests/ui/mock';
        ThJobModel = $injector.get('ThJobModel');
        ThJobModel.get_uri = function(){
            return getProjectUrl("/jobs/", foregroundRepo);
        }
    }));

    describe("getList", function(){
        beforeEach(inject(function () {
            $httpBackend.whenGET(getProjectUrl('/jobs/', foregroundRepo)).respond(
                getJSONFixture('job_list/job_1.json')
            );
        }));

        it("should return a promise", function(){
            var result = ThJobModel.getList(foregroundRepo);
            $httpBackend.flush();
            expect(result.then).toBeDefined();
            $httpBackend.verifyNoOutstandingRequest();
        });

        describe("pagination", function(){
            beforeEach(inject(function () {
                $httpBackend.whenGET(getProjectUrl('/jobs/?count=2', foregroundRepo)).respond(
                    getJSONFixture('job_list/pagination/page_1.json')
                );
                $httpBackend.whenGET(getProjectUrl('/jobs/?count=2&offset=2', foregroundRepo)).respond(
                    getJSONFixture('job_list/pagination/page_2.json')
                );
            }));

            it("should return a page of results by default", function(){
                var result = ThJobModel.getList(
                    foregroundRepo,
                    {count: 2}
                ).
                then(function(jobList){
                    expect(jobList.length).toBe(2);
                });
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it("should return all the pages when fetch_all==true", function(){
                var result = ThJobModel.getList(
                    foregroundRepo,
                    {count: 2},
                    {fetch_all: true}
                ).
                then(function(jobList){
                    expect(jobList.length).toBe(3);
                    expect(jobList[2].id).toBe(3);
                });
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingRequest();
            });
        });
    });
});
