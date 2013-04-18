desc "Compiles the js"
task :default => [:build]

desc "compiles"
task :build do
	srcFiles = Dir['src/**/*.js']	
	sh "java -jar compiler/compiler.jar --js #{srcFiles.join(" ")} --js_output_file desteer.js"
end

desc "compiles debug version"
task :build_debug do
	srcFiles = Dir['src/**/*.js']	
	sh "java -jar compiler/compiler.jar --js #{srcFiles.join(" ")} --compilation_level WHITESPACE_ONLY --formatting PRETTY_PRINT --js_output_file desteer.js"
end

