(function(angular, undefined) {
  angular.module("smartSchoolRideApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"super",
		"admin",
		"parent"
	],
	"mainTabs": {
		"homeTab": {
			"title": "HOME",
			"link": "/app/home"
		},
		"liveTrackingTab": {
			"title": "LIVE TRACKING",
			"link": "/app/livetracking"
		},
		"communicationsTab": {
			"title": "COMMUNICATIONS",
			"link": "/app/communications"
		},
		"busInspections": {
			"title": "BUS INSPECTIONS",
			"link": "/app/businspections"
		},
		"reportsTab": {
			"title": "REPORTS",
			"link": "/app/reports"
		},
		"settingsTab": {
			"title": "SET-UP & SETTINGS",
			"link": "/app/settings"
		}
	}
})

;
})(angular);