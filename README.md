# testcafe-sample-test-framework

export SAUCE_BUILD={sauce_build}

export SAUCE_USERNAME={sauce_username}

export SAUCE_JOB={sauce_job} 

export SAUCE_SCREEN_RESOLUTION={sauce_screen_resolution}

export SAUCE_ACCESS_KEY={sauce_access_key}

export SAUCE_CAPABILITIES_OVERRIDES_PATH={sauce+desired_capability_path}

cd testcafe && node testcafe-desktop-run.js --browser='saucelabs:Chrome@beta:Windows 10'
